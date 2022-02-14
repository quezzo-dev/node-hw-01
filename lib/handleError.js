export const ExitCode = {
  success: 0,
  error: 1,
}

export const handleError = (error) => {
  if (error) {
    console.error(error.message)
    process.exit(ExitCode.error)
  }
}