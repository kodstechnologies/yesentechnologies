import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { QuoteForm, type QuoteInitial } from "@/components/QuoteForm";

type QuoteModalCtx = { openQuote: (initial?: QuoteInitial) => void };

const Ctx = createContext<QuoteModalCtx>({ openQuote: () => {} });

export const useQuoteModal = () => useContext(Ctx);

/**
 * Global quote-form modal. Any "Get a quote" action opens the form in place
 * instead of navigating away; /enquire still works as a direct URL.
 */
export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; initial: QuoteInitial; key: number }>({
    open: false,
    initial: {},
    key: 0,
  });

  const openQuote = useCallback((initial: QuoteInitial = {}) => {
    setState((s) => ({ open: true, initial, key: s.key + 1 }));
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [state.open, close]);

  return (
    <Ctx.Provider value={{ openQuote }}>
      {children}
      {state.open && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-brand-navy/60 p-3 backdrop-blur-sm animate-in fade-in duration-200 sm:items-center sm:p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Get a quote"
        >
          <div
            className="my-auto w-full max-w-[72rem] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <QuoteForm key={state.key} initial={state.initial} onClose={close} />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

/** Drop-in replacement for a Link to /enquire — opens the quote modal instead. */
export function QuoteLink({
  initial,
  className,
  children,
  onClick,
}: {
  initial?: QuoteInitial;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { openQuote } = useQuoteModal();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openQuote(initial);
      }}
    >
      {children}
    </button>
  );
}
