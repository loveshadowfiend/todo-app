import { useAppStore } from "../stores/AppStore";

export const Tags = () => {
    const { toggleTagOption } = useAppStore();

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
                        toggleTagOption(e.target.value);
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
                        toggleTagOption(e.target.value);
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
                        toggleTagOption(e.target.value);
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
