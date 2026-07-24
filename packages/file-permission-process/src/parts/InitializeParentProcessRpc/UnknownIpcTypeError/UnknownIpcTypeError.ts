export class UnknownIpcTypeError extends Error {
  code = 'FILE_PERMISSION_PROCESS_UNKNOWN_IPC_TYPE'

  constructor() {
    super('[file-permission-process] unknown ipc type')
    this.name = 'UnknownIpcTypeError'
  }
}
