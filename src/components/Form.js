export default function Form(props) {

    const categoryElement = props.category.map((e) => (
        <option key={e.id} value={e.id}>{e.name}</option>
    ))

    return (
        <>
            <div className="form">
                <select
                    className="form__menu"
                    id="difficulty"
                    onChange={props.handleFormData}
                    name="difficulty"
                    value={props.difficulty}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="form">
                <select
                    className="form__menu"
                    id="topic"
                    onChange={props.handleFormData}
                    name="topic"
                    value={props.topic}>
                    {categoryElement}
                </select>
            </div>
            <div className="form">
                <input
                    type="number"
                    className="form__menu"
                    id="number"
                    onChange={props.handleFormData}
                    name="number"
                    placeholder="Enter from 1 to 50"
                    value={props.number > 50 ? 50 :
                        props.number < 0 ? 1 : props.number}
                />
            </div>
        </>
    )
}