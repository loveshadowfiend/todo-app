interface OptionProps {
    toggleOption: (option: string) => void;
}

export const Tags = (props: OptionProps) => {
    return (
        <div className="tags">
            <h3>Отметки</h3>
            <form>
                <div>
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
                        research
                    </label>
                </div>

                <div>
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
                        design
                    </label>
                </div>

                <div>
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
                        development
                    </label>
                </div>
            </form>
        </div>
    );
};
