import { handleEnterKeyDown } from 'src/services/handleEnterKeyDown';

describe('Handle key down', () => {
  it('calls callback when Enter is pressed', () => {
    const mock = jest.fn();
    handleEnterKeyDown(new KeyboardEvent('keyDown', { key: 'Enter' }), mock);
    expect(mock).toHaveBeenCalled();
  });

  it('does not call callback when random key is pressed', () => {
    const mock = jest.fn();
    handleEnterKeyDown(new KeyboardEvent('keyDown', { key: 'a' }), mock);
    expect(mock).not.toHaveBeenCalled();
  });
});
