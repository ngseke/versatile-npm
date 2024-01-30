export function mockChrome () {
  const mockedChrome = {
    storage: {
      sync: {
        get: vi.fn().mockResolvedValue({}),
        set: vi.fn(),
      },
      onChanged: {
        addListener: vi.fn(),
        removeListener: vi.fn(),
      },
    },
  }
  vi.stubGlobal('chrome', mockedChrome)
  return mockedChrome
}

beforeEach(() => {
  // To ensure that Chrome is mocked in every test
  vi.stubGlobal('chrome', undefined)
})
