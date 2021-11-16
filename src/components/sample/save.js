/**
 * WordPress dependencies
 */
import { InnerBlocks } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	return (
		<div>
			<div>
				<h1>{attributes.title}</h1>
				<form>
					<input type="text" name="title" />
					<input type="text" name="url" />
					<button type="submit">Submit</button>
				</form>
			</div>
			<img src={attributes.url} />
		</div>
	);
};

export default Save;
