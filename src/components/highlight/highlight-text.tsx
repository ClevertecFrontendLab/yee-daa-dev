import React from 'react';

type HighlightTextProps = {
    text: string;
    query: string;
};

export const HighlightText: React.FC<HighlightTextProps> = ({ text, query }) => {
    if (!query) {
        return <span>{text}</span>;
    }

    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return (
        <span data-test-id='card-title'>
            {parts.map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <span key={index} style={{ color: '#2DB100' }}>
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </span>
    );
};
