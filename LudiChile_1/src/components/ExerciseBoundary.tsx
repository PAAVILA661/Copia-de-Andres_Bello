"use client";

import React, { ErrorInfo } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ExerciseBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error en componente:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <div>Ha ocurrido un error en este ejercicio.</div>;
    }

    return this.props.children;
  }
} 