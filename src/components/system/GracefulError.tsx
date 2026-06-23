"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional in-tone text fallback so the words always survive. */
  fallbackLines?: string[];
}

interface State {
  hasError: boolean;
}

/**
 * Never break the spell. On any render error, show an in-tone message and retry —
 * and, if provided, the plain words of the moment so the confession is never lost.
 */
export class GracefulError extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[GracefulError]", error);
    }
  }

  handleRetry = () => this.setState({ hasError: false });

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-serif text-[1.2rem] italic text-paper/80">
          Give me a second. I&apos;m getting the words right.
        </p>
        {this.props.fallbackLines?.map((line, i) => (
          <p key={i} className="font-serif text-[1.05rem] text-paper-dim">
            {line}
          </p>
        ))}
        <button
          type="button"
          onClick={this.handleRetry}
          className="mt-2 text-[0.7rem] uppercase tracking-[0.3em] text-amber/70"
        >
          stay with me
        </button>
      </div>
    );
  }
}
