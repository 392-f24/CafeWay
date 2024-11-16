import { ref, push, set } from 'firebase/database';
import { addCafePost } from './posts';
import { vi } from 'vitest';

vi.mock('firebase/database', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    ref: vi.fn(),
    push: vi.fn(),
    set: vi.fn(),
  };
});

describe('addCafePost', () => {
  const mockCafeId = 'cafe123';
  const mockPost = {
    category: 'Review',
    content: 'This cafe has great coffee!',
    date: '2024-11-16',
    email: 'user@example.com',
    replies: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully add a cafe post', async () => {
    // Mock Firebase functions
    const mockPostRef = { key: 'newPost123' };
    vi.mocked(ref).mockReturnValue('mockRef');
    vi.mocked(push).mockReturnValue(mockPostRef);
    vi.mocked(set).mockResolvedValueOnce();

    // Call the function
    const result = await addCafePost(mockCafeId, mockPost);

    // Validate calls and behavior
    expect(ref).toHaveBeenCalledWith(expect.anything(), '/posts');
    expect(push).toHaveBeenCalledWith('mockRef');
    expect(set).toHaveBeenCalledWith(mockPostRef, {
      cafeId: mockCafeId,
      category: mockPost.category,
      content: mockPost.content,
      date: mockPost.date,
      email: mockPost.email,
      replies: {},
    });

    // Ensure no errors
    expect(result).toBeNull();
  });

  it('should handle errors when adding a cafe post', async () => {
    // Mock Firebase functions to throw an error
    const mockError = new Error('Firebase set error');
    vi.mocked(ref).mockReturnValue('mockRef');
    vi.mocked(push).mockReturnValue({ key: 'newPost123' });
    vi.mocked(set).mockRejectedValueOnce(mockError);
  
    // Spy on console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  
    // Call the function
    const result = await addCafePost(mockCafeId, mockPost);
  
    // Validate error handling
    expect(result).toBe(mockError.message);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding cafe post:', mockError);
  
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
  
});
