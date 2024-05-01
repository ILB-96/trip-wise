interface IComment {
    id: number;
    image?: string;
    authorName: string;
    email: string;
    content: string;
    createdAt: number;

}
export const dummyComments: IComment[] = [
    {
        id: 1,
        image: "https://avatars.githubusercontent.com/u/26360846?v=4",
        authorName: "Jameel Gharra",
        email: "jameelgharra@gmail.com",
        content: "BUMP!!!!",
        createdAt: 1714581416,
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1642195349088-953f63a7d4df?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        authorName: "Tester tester",
        email: "tester@tester.com",
        content: "I liked this so much.",
        createdAt: 1711989497,
    },
    {
        id: 3,
        image: "",
        authorName: "A hater",
        email: "ihateeveryone@domain.com",
        content: "Some boring type of shit 👎",
        createdAt: 1714563497,
    },
];