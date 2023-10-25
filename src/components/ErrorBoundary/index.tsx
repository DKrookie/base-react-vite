import React from 'react';
import { Button, Result } from 'antd';

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props, { hasError: boolean; message: string }> {
  state = { hasError: false, message: '' };

  static getDerivedStateFromError(e: Error) {
    return { hasError: true, message: e.message };
  }

  componentDidCatch() {
    // 可以在这做一些错误上报
  }

  reload = () => {
    console.log(this);

    location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title={this.state.message}
          subTitle="出错了！请刷新页面"
          extra={<Button onClick={this.reload}>刷新页面</Button>}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
