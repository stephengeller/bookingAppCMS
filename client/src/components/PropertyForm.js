import React, { Component } from 'react';
import { Row, Preloader } from 'react-materialize';

import Formatter from '../modules/Formatter';
import ErrorHandler from '../modules/ErrorHandler';
import GoogleMapsAPI from '../modules/GoogleMapsAPI';
import AddPropertyButton from './buttons/AddPropertyButton';
import FormItem from './FormItem';

const PropertyFields = require('../json/PropertyForm/PropertyFormFields');
const RequiredFields = require('../json/PropertyForm/RequiredFields');
const AllFields = require('../json/PropertyForm/AllFields');

class PropertyForm extends Component {
	constructor(props) {
		super(props);
		this.addProperty = this.addProperty.bind(this);
		this.updateInputValue = this.updateInputValue.bind(this);
		this.submissionInProgress = this.submissionInProgress.bind(this);
		this.handleMissingFields = this.handleMissingFields.bind(this);
		this.buildForm = this.buildForm.bind(this);
		this.formatter = new Formatter();
		this.errorHandler = new ErrorHandler();
		this.mapsAPI = new GoogleMapsAPI({
			googleApiKey: this.props.googleApiKey
		});
		this.allFields = AllFields;
		this.requiredFields = RequiredFields;

		this.state = {
			fields: {
				location: {}
			},
			notice: '',
			loading: false
		};
	}

	async setUpFieldsObject(fields) {
		const { postcode } = this.state.fields;
		const lngLat = await this.mapsAPI.getPostcodeResults(postcode);
		const { title, description, bookingEmail } = fields;
		return {
			title,
			description,
			location: {
				lat: lngLat.latitude,
				lon: lngLat.longitude
			},
			facilities: this.formatter.formatItemStringToArray(fields.facilities),
			address: await this.formatter.convertAddressToArray(fields),
			ownerId: 'testOwnerId',
			bookingEmail
		};
	}

	cleanFields(fieldsToClean, currentFieldsState) {
		fieldsToClean.map(fieldName => (currentFieldsState[fieldName] = ''));
		return currentFieldsState;
	}

	submissionInProgress(bool) {
		this.setState({ loading: bool });
	}

	async addProperty() {
		this.submissionInProgress(true);
		if (
			this.errorHandler.allFieldsAreCompleted(
				this.requiredFields,
				this.state.fields
			)
		) {
			const fields = await this.setUpFieldsObject(this.state.fields);

			this.props.apiClient
				.post('/properties/', fields)
				.then(() => {
                    this.submissionInProgress(false);
                    const notice = {
						message: `Property "${fields.title}" successfully added`,
						style: { color: 'green' }
					};
					const currentFieldsState = this.cleanFields(
						this.allFields,
						this.state.fields
					);
					this.setState({ fields: currentFieldsState, notice });
				})
				.catch(error => {
					console.log(error, fields);
					const errorMessage = {
						message: error.toString(),
						style: { color: 'red' }
					};
					this.submissionInProgress(false);
					this.setState({ notice: errorMessage });
				});
		} else {
			this.handleMissingFields();
		}
	}

	handleMissingFields() {
		const notice = this.errorHandler.emptyBoxErrorHandler(
			this.requiredFields,
			this.state
		);
		this.submissionInProgress(false);
		this.setState({ notice });
	}

	updateInputValue(evt, formName) {
		let value = evt.target.value.toString();
		let fields = this.state.fields;
		fields[formName] = value;
		this.setState({
			fields
		});
	}

	buildForm(fields) {
		const form = [];
		const keys = Object.keys(fields);
		for (let section in keys) {
			const sectionFields = fields[keys[section]];
			form.push(
				<h5 className="center-align">
					<strong>{keys[section]}</strong>
				</h5>
			);
			for (let field in sectionFields) {
				form.push(
					<FormItem
						name={sectionFields[field].name}
						label={sectionFields[field].label}
						value={this.state.fields[sectionFields[field].name]}
						type={sectionFields[field].type}
						updateInputValue={this.updateInputValue}
						key={sectionFields[field].name}
					/>
				);
			}
		}
		return form;
	}

	render() {
		return (
			<div className="container">
				<div className="notice" style={this.state.notice.style} id="error">
					{this.state.notice.message}
				</div>
				{this.buildForm(PropertyFields)}
				<br />
				{this.state.loading === false ? (
					<Row>
						<AddPropertyButton addProperty={this.addProperty} />
						<br />
					</Row>
				) : (
					<Preloader />
				)}
			</div>
		);
	}
}

export default PropertyForm;
