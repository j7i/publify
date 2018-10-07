import { Component } from 'react'

interface IErrorBoundaryState {
    hasError: boolean
    statusCode: number | null
}

export default class ErrorBoundary extends Component<{}, IErrorBoundaryState>  {
    public readonly state: IErrorBoundaryState = {
        hasError: false,
        statusCode: null
      }
  
    public componentDidCatch(): void {

      // Display fallback UI
      this.setState({ hasError: true});
      // You can also log the error to an error reporting service
      // public componentDidCatch(error: Error, info): void {
      // logErrorToMyService(error, info);
    }
  
    public render(): React.ReactNode  {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children;
    }
  }
  