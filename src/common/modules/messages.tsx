import React from 'react';
import create from 'zustand';

interface IMessage {
  title?: string,
  descr: string,
  severity: "info" | "error" | "warning" | "success",
}

export function Messages() {
  return (
    <div></div>
  )
}
