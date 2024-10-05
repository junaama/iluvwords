import SharedLayout from "@/appcomponents/SharedLayout"

const sensesRules = [
    "Compete with the world to get the most unique sensory description of the word of the day.",
    "Come back tomorrow and play again with a new word!"
]

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SharedLayout gameMode="Survey Senses" rules={sensesRules}>
            {children}
        </SharedLayout>
    );
}