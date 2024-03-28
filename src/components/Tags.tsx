import { TagRow } from "./TagRow";

export const Tags = () => {
    return (
        <div className="tags">
            <div className="tags-prioritiy">
                <h3 className="tags-priority__header">ПРИОРИТЕТ</h3>
                <TagRow>Low</TagRow>
                <TagRow>Normal</TagRow>
                <TagRow>High</TagRow>
            </div>

            <div className="tags-duty">
                <h3 className="tags-duty__header">ОТМЕТКИ</h3>
                <TagRow>Research</TagRow>
                <TagRow>Development</TagRow>
                <TagRow>Design</TagRow>
            </div>
        </div>
    );
};
