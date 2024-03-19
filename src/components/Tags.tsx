interface OptionProps {
    toggleOption: (option: string) => void;
}

export const Tags = (props: OptionProps) => {
    return (
        <div className="tags">
            <h3>ОТМЕТКИ</h3>
            {/* <form> */}
            <div className="tags__row">
                <input
                    className="tags__option"
                    type="checkbox"
                    name="tag"
                    value="research"
                    defaultChecked={true}
                    onChange={(e) => {
                        props.toggleOption(e.target.value);
                    }}
                />
                <label className="tags__option-label" htmlFor="low">
                    Research
                </label>
            </div>

            <div className="tags__row">
                <input
                    className="tags__option"
                    type="checkbox"
                    name="tag"
                    value="design"
                    defaultChecked={true}
                    onChange={(e) => {
                        props.toggleOption(e.target.value);
                    }}
                />
                <label className="tags__option-label" htmlFor="normal">
                    Design
                </label>
            </div>

            <div className="tags__row">
                <input
                    className="tags__option"
                    type="checkbox"
                    name="tag"
                    value="development"
                    defaultChecked={true}
                    onChange={(e) => {
                        props.toggleOption(e.target.value);
                    }}
                />
                <label className="tags__option-label" htmlFor="high">
                    Development
                </label>
            </div>
            {/* </form> */}
        </div>
    );
};
