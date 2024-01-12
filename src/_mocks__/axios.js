// __mocks__/axios.js

const mockResponse = { data: 'Mocked data' };

const axios = {
  get: jest.fn(() => Promise.resolve(mockResponse)),
  // Add other Axios methods you need to mock (e.g., post, put, etc.)
};

export default axios;
