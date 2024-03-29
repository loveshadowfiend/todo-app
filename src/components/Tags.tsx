import { TagRow } from "./TagRow";

export const Tags = () => {
    return (
        <div className="tags">
            <div className="tags__priority">
                <h3 className="tags__priority__header">ПРИОРИТЕТ</h3>
                <div className="tags__priority__rows">
                    <TagRow>Low</TagRow>
                    <TagRow>Normal</TagRow>
                    <TagRow>High</TagRow>
                </div>
            </div>

            <div className="tags__duty">
                <h3 className="tags__duty__header">ОТМЕТКИ</h3>
                <div className="tags__duty__rows">
                    <TagRow>Research</TagRow>
                    <TagRow>Design</TagRow>
                    <TagRow>Development</TagRow>
                </div>
            </div>
        </div>
    );
};
