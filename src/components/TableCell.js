import React, { useState, Fragment } from 'react';
import {database} from '../initialize-firebase';

function TableCell(props) {
	const {
		id,
		manufacturer,
		model,
		isEditable = false,
		index,
	} = props;

	const [inEditMode, setInEditMode] = useState(false);
	const [inputValue, setInputValue] = useState(id || manufacturer || model)

	// render field text conditionally depending on which cell type we're in, when we're not in edit mode
	function renderFieldText() {
		if (!inEditMode) {
			return <span className={manufacturer === 'Ford' ? 'bold' : ''}>{id || manufacturer || model.toUpperCase()}</span>;
		} else {
			return;
		}
	}

	// render icon only for manufacturer & model cell types
	function renderIcon() {
		if (isEditable && !inEditMode) {
			return <svg className="edit icon" onClick={() => setInEditMode(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>;
		} else if (inEditMode) {
			return;
		}
	}

	// switch to edit mode
	function renderEditField() {
		if (inEditMode) {
			return (
				<Fragment>
					<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
					<button onClick={submitEditField}>Save</button>
				</Fragment>
			) ;
		} else {
			return;
		}
	}

	// put to database
	function saveToDb() {
		if (manufacturer) {
			database.ref(`/${index}/manufacturer`).set(inputValue)
		} else if (model) {
			database.ref(`/${index}/model`).set(inputValue)
		}
	}

	// onClick handler for save button
	function submitEditField() {
		saveToDb();
		setInEditMode(false);
	}

	return (
    <div className="cell">
    	{renderFieldText()}
    	{renderIcon()}
    	{renderEditField()}
    </div>
	);
}

export default TableCell;