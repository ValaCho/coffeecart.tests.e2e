import { test, expect } from "@playwright/test";

function votingOportunities(age: number) {
    const canVote = "Ви можете голосувати.";
    const cannotVote = "Ви ще не можете голосувати.";

    if (age >= 18) {
        return canVote;
    } else {
        return cannotVote;
    }
}

test("check voting for 12 age", () => {
    expect(votingOportunities(12)).toBe("Ви ще не можете голосувати.");
});

test("check voting for 17 age", () => {
    expect(votingOportunities(17)).toBe("Ви ще не можете голосувати.");
});

test("check voting for 18 age", () => {
    expect(votingOportunities(18)).toBe("Ви можете голосувати.");
});

test("check voting for 19 age", () => {
    expect(votingOportunities(19)).toBe("Ви можете голосувати.");
});

test("check voting for 35 age", () => {
    expect(votingOportunities(35)).toBe("Ви можете голосувати.");
});

