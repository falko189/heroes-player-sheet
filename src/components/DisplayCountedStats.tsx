import React from 'react';

interface DisplayCountedStatsProps {
    stats: { [key: string]: number };
}

const DisplayCountedStats: React.FC<DisplayCountedStatsProps> = ({ stats }) => {
    return (
        <div>
            { stats ? (
                <ul>
                    {Object.entries(stats).map(([key, value]) => (
                        <li key={key}>
                            {key}: {value}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No affecting stats to display.</p>
            )}
        </div>
    );
};

export default DisplayCountedStats;