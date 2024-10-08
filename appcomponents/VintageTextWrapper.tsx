import React, { ReactNode } from 'react'

interface VintageTextWrapperProps {
    children: ReactNode
    as?: keyof JSX.IntrinsicElements
    className?: string
}

export default function VintageTextWrapper({
    children,
    as: Component = 'span',
    className = '',
}: VintageTextWrapperProps) {
    const wrapLetters = (text: string) => {
        const words = text.split(/(\s+)/)
        return words.map((word, wordIndex) => {
            if (word.trim() === '') {
                return <span key={`space-${wordIndex}`}>{word}</span>
            }
            const letters = word.split('').map((letter, letterIndex) => {
                return (
                    <span
                        key={`${wordIndex}-${letterIndex}`}
                        style={{
                            display: 'inline-block',
                            transform: `skew(${Math.random() * 10 - 5}deg, ${Math.random() * 6 - 3}deg)`,
                            filter: `opacity(${0.7 + Math.random() * 0.3})`,
                            fontWeight: Math.random() > 0.5 ? 'normal' : 'bold',
                        }}
                    >
                        {letter}
                    </span>
                )
            })
            return (
                <span key={`word-${wordIndex}`} style={{ display: 'inline-block' }}>
                    {letters}
                </span>
            )
        })
    }

    const wrapContent = (content: ReactNode): ReactNode => {
        if (typeof content === 'string') {
            return wrapLetters(content)
        }

        if (React.isValidElement(content)) {
            return React.cloneElement(content, {}, wrapContent(content.props.children))
        }

        if (Array.isArray(content)) {
            return content.map((child, index) => (
                <React.Fragment key={index}>{wrapContent(child)}</React.Fragment>
            ))
        }

        return content
    }

    return (
        <Component className={`vintage-text-wrapper ${className}`}>
            {wrapContent(children)}
            <style jsx>{`
                .vintage-text-wrapper {
                    display: inline;
                    color: #333;
                    line-height: 1.6;
                    word-spacing: 0.2em;
                }
            `}</style>
        </Component>
    )
}