import SharedLayout from "@/appcomponents/SharedLayout"

const originRules = [
    "Race against time to get as many synonyms or words with a similar meaning as the word of the day.",
    "Example: ",
    "If the word of the day is ENERGETIC, and the list of words to arrange are ERGON, ENERGETIKOS, ENERGEIN--the correct order is ERGON > ENERGEIN > ENERGETIKOS.",
    "Come back daily to play again with new words!"
]

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SharedLayout gameMode="Origin" rules={originRules}>
            {children}
        </SharedLayout>
    );
}