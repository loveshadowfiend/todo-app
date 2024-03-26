import { useGlobalStore } from "../stores/globalStore";

export const Priorities = () => {
    const { toggleTagOption } = useGlobalStore();

    return (
        <div className="priorities">
            <h3 className="priorities__header">ПРИОРИТЕТ</h3>
            {/* <form className="priorities__form"> */}
            <div className="priorities__row">
                <input
                    className="priorities__option"
                    type="checkbox"
                    name="priorities"
                    value="low"
                    defaultChecked={true}
                    onChange={(e) => {
                        toggleTagOption(e.target.value);
                    }}
                />
                <label className="priorities__option-label" htmlFor="low">
                    Low
                </label>
            </div>

            <div className="priorities__row">
                <input
                    className="priorities__option"
                    type="checkbox"
                    name="priorities"
                    value="normal"
                    defaultChecked={true}
                    onChange={(e) => {
                        toggleTagOption(e.target.value);
                    }}
                />
                <label className="priorities__option-label" htmlFor="normal">
                    Normal
                </label>
            </div>

            <div className="priorities__row">
                <input
                    className="priorities__option"
                    type="checkbox"
                    name="priorities"
                    value="high"
                    defaultChecked={true}
                    onChange={(e) => {
                        toggleTagOption(e.target.value);
                    }}
                />
                <label className="priorities__option-label" htmlFor="high">
                    High
                </label>
            </div>
            {/* </form> */}
        </div>
    );
};
