type AnyEvent = { defaultPrevented?: boolean };

export function composeEventHandlers<E extends AnyEvent>(
  theirHandler?: ((event: E) => void) | undefined,
  ourHandler?: ((event: E) => void) | undefined,
  options?: { checkDefaultPrevented?: boolean },
) {
  const checkDefaultPrevented = options?.checkDefaultPrevented ?? true;

  return (event: E) => {
    theirHandler?.(event);
    if (!checkDefaultPrevented || !event.defaultPrevented) {
      ourHandler?.(event);
    }
  };
}
