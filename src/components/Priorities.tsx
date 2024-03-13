interface OptionProps {
    toggleOption: (option: string) => void;
}

export const Priorities = (props: OptionProps) => {
    return (
        <div className="priorities">
            <h3>Приоритет</h3>
            <form>
                <div>
                    <input
                        className="priorities__option"
                        type="checkbox"
                        name="priorities"
                        value="low"
                        defaultChecked={true}
                        onChange={(e) => {
                            props.toggleOption(e.target.value);
                        }}
                    />
                    <label className="priorities__option-label" htmlFor="low">
                        low
                    </label>
                </div>

                <div>
                    <input
                        className="priorities__option"
                        type="checkbox"
                        name="priorities"
                        value="normal"
                        defaultChecked={true}
                        onChange={(e) => {
                            props.toggleOption(e.target.value);
                        }}
                    />
                    <label
                        className="priorities__option-label"
                        htmlFor="normal"
                    >
                        normal
                    </label>
                </div>

                <div>
                    <input
                        className="priorities__option"
                        type="checkbox"
                        name="priorities"
                        value="high"
                        defaultChecked={true}
                        onChange={(e) => {
                            props.toggleOption(e.target.value);
                        }}
                    />
                    <label className="priorities__option-label" htmlFor="high">
                        high
                    </label>
                </div>
            </form>
        </div>
    );
};
