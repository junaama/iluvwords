import SharedLayout from "@/appcomponents/SharedLayout"

const babelRules = [
    "Create and connect anagrams from today's word of the day to drop all letters.",
    "Come back daily and play again with new words!"
]

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SharedLayout gameMode="BABEL" rules={babelRules}>
            {children}
        </SharedLayout>
    );
}