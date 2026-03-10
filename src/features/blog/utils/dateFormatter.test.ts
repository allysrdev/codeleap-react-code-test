import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { dateFormatter } from "./dateFormatter";

describe("dateFormatter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-10T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return 'just now' for very recent dates", () => {
    const result = dateFormatter("2026-03-10T11:59:59Z");

    expect(result).toBe("1 second ago");
  });

  it("should format minutes correctly", () => {
    const result = dateFormatter("2026-03-10T11:58:00Z");

    expect(result).toBe("2 minutes ago");
  });

  it("should format hours correctly", () => {
    const result = dateFormatter("2026-03-10T10:00:00Z");

    expect(result).toBe("2 hours ago");
  });

  it("should format days correctly", () => {
    const result = dateFormatter("2026-03-08T12:00:00Z");

    expect(result).toBe("2 days ago");
  });

  it("should format months correctly", () => {
    const result = dateFormatter("2026-01-10T12:00:00Z");

    expect(result).toBe("1 month ago");
  });

  it("should format years correctly", () => {
    const result = dateFormatter("2024-03-10T12:00:00Z");

    expect(result).toBe("2 years ago");
  });
});
