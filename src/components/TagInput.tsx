import React, { useState, KeyboardEvent } from 'react';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            // 입력값이 없을 때 백스페이스를 누르면 마지막 태그 삭제
            removeTag(tags.length - 1);
        }
    };

    const addTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue)) {
            const newTags = [...tags, trimmedValue];
            onChange(newTags);
            setInputValue('');
        }
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        onChange(newTags);
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 p-2 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[42px]">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                        >
                            ×
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag}
                    placeholder={tags.length === 0 ? "태그 입력 (쉼표 또는 엔터로 구분)" : ""}
                    className="flex-grow min-w-[120px] outline-none bg-transparent dark:text-white"
                />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                쉼표 또는 엔터를 눌러 태그를 추가하세요
            </p>
        </div>
    );
};
