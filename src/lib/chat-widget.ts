import { CHAT_PATH } from "../../worker/chat-path.js";

/**
 * The chat widget's client behaviour — plain DOM, no React runtime.
 *
 * Same constraint as the live clock, the tap tracker and the pharmacy
 * filter: `output: "export"` ships no client component tree at all
 * (scripts/strip-runtime.ts removes it from every page), so anything
 * interactive on this site is a vanilla script the page renders inline.
 *
 * SECURITY: every value that reaches the DOM through textContent, never
 * innerHTML — a reply that contains "<img onerror=..." must render as
 * literal text, not be parsed. The one exception is the loading dots,
 * which are static markup with no user input in them.
 *
 * CHAT_PATH is imported from the Worker source rather than typed again here,
 * so the endpoint the browser calls and the one the Worker serves can never
 * drift apart.
 */

export interface ChatWidgetText {
  toggleLabel: string;
  title: string;
  disclaimer: string;
  greeting: string;
  placeholder: string;
  send: string;
  callCta: string;
  closeLabel: string;
  thinking: string;
  errorReply: string;
  urgentBadge: string;
}

/**
 * Serialised into the page as JSON inside a `<script type="application/json">`
 * tag (see ChatWidget.tsx) and read back here — never interpolated into a
 * JS template literal, which is how a translated string containing a
 * backtick or `</script>` would otherwise break the page.
 */
export function chatWidgetScript(locale: string): string {
  return `(function(){
try{
  var root = document.getElementById('chat-widget');
  if (!root) return;
  var textEl = document.getElementById('chat-widget-text');
  var t = JSON.parse(textEl.textContent);
  var locale = ${JSON.stringify(locale)};

  var toggle = document.getElementById('chat-toggle');
  var panel = document.getElementById('chat-panel');
  var closeBtn = document.getElementById('chat-close');
  var log = document.getElementById('chat-log');
  var form = document.getElementById('chat-form');
  var input = document.getElementById('chat-input');
  var sendBtn = document.getElementById('chat-send');

  var messages = []; // { role, content } sent to the API — no DOM in here.
  var busy = false;
  var greeted = false;

  function bubble(role, text, opts) {
    opts = opts || {};
    var wrap = document.createElement('div');
    wrap.className = 'flex ' + (role === 'user' ? 'justify-end' : 'justify-start');
    var b = document.createElement('div');
    var base = 'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug';
    if (role === 'user') {
      b.className = base + ' bg-primary text-on-primary';
    } else if (opts.urgent) {
      b.className = base + ' bg-call/10 text-ink ring-1 ring-call/40';
    } else {
      b.className = base + ' bg-surface-2 text-ink';
    }
    if (opts.urgent) {
      var badge = document.createElement('div');
      badge.className = 'mb-1 text-[11px] font-bold uppercase tracking-wide text-call-ink';
      badge.textContent = t.urgentBadge;
      b.appendChild(badge);
    }
    var p = document.createElement('p');
    p.style.whiteSpace = 'pre-wrap';
    p.textContent = text; // never innerHTML: a reply is untrusted text, not markup.
    b.appendChild(p);
    wrap.appendChild(b);
    log.appendChild(wrap);
    log.scrollTop = log.scrollHeight;
    return wrap;
  }

  function thinkingBubble() {
    var wrap = document.createElement('div');
    wrap.className = 'flex justify-start';
    wrap.id = 'chat-thinking';
    var b = document.createElement('div');
    b.className = 'max-w-[85%] rounded-2xl bg-surface-2 px-3.5 py-2.5 text-sm text-ink-muted';
    b.textContent = t.thinking;
    wrap.appendChild(b);
    log.appendChild(wrap);
    log.scrollTop = log.scrollHeight;
  }

  function removeThinking() {
    var el = document.getElementById('chat-thinking');
    if (el) el.remove();
  }

  function setBusy(v) {
    busy = v;
    input.disabled = v;
    sendBtn.disabled = v;
  }

  function open() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    if (!greeted) {
      greeted = true;
      bubble('assistant', t.greeting);
    }
    input.focus();
  }

  function close() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (panel.hidden) open(); else close();
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && !panel.hidden) close();
  });

  /*
   * Attention jump: the launcher hops twice, a few seconds after the page
   * settles, so a visitor who hasn't noticed the assistant yet has a
   * reason to look at the corner of the screen. Skipped outright if the
   * chat is already open by then — someone already talking to it doesn't
   * need the button under their thumb hopping around.
   *
   * The dismiss button (chat-dismiss) appears on the SAME schedule whether
   * or not the animation actually ran: prefers-reduced-motion turns the
   * jump into a no-op in CSS (see globals.css, .chat-jump), and a setTimeout
   * matched to the animation's own duration is simpler and more robust
   * here than listening for animationend, which would just never fire
   * under that same setting and silently strand the dismiss control.
   */
  var dismissBtn = document.getElementById('chat-dismiss');
  var wrapper = dismissBtn && dismissBtn.parentElement;
  if (toggle && dismissBtn && wrapper) {
    setTimeout(function () {
      if (!panel.hidden) return;
      toggle.classList.add('chat-jump');
      setTimeout(function () {
        dismissBtn.hidden = false;
      }, 1500); // 2 iterations of the 0.7s jump, plus a small margin
    }, 2500);

    dismissBtn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      wrapper.hidden = true;
    });
  }

  // Enter sends, Shift+Enter inserts a newline — a <textarea> submits on
  // neither by default, so both behaviours have to be wired by hand.
  input.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      if (typeof form.requestSubmit === 'function') form.requestSubmit();
      else form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  });
  // Grows with the message up to 4 lines, then scrolls — a fixed single
  // row would clip a longer question as it's being typed.
  input.addEventListener('input', function () {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 112) + 'px';
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (busy) return;
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    bubble('user', text);
    messages.push({ role: 'user', content: text });
    setBusy(true);
    thinkingBubble();

    fetch(${JSON.stringify(CHAT_PATH)}, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ locale: locale, messages: messages.slice(-12) })
    })
      .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (r) {
        removeThinking();
        if (!r.ok || !r.data || !r.data.reply) {
          bubble('assistant', t.errorReply);
          return;
        }
        bubble('assistant', r.data.reply, { urgent: !!r.data.urgent });
        messages.push({ role: 'assistant', content: r.data.reply });
      })
      .catch(function () {
        removeThinking();
        bubble('assistant', t.errorReply);
      })
      .then(function () { setBusy(false); input.focus(); });
  });
} catch (e) {}
})();`;
}
