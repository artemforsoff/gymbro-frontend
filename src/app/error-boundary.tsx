import { Component, type GetDerivedStateFromError, type PropsWithChildren } from 'react';

interface ErrorBoundaryProps extends PropsWithChildren {}

interface ErrorBoundaryState {
  error?: unknown;
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  // eslint-disable-next-line max-len
  static getDerivedStateFromError: GetDerivedStateFromError<
    ErrorBoundaryProps,
    ErrorBoundaryState
  > = (error) => ({ error });

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const {
      state: { error },
      props: { children },
    } = this;

    return 'error' in this.state ? (
      <div>
        <p>An unhandled error occurred:</p>
        <blockquote>
          <code>
            {error instanceof Error
              ? error.message
              : typeof error === 'string'
                ? error
                : JSON.stringify(error)}
          </code>
        </blockquote>
      </div>
    ) : (
      children
    );
  }
}
