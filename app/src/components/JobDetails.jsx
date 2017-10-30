import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Heading from 'd2-ui/lib/headings/Heading.component';
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import moment from 'moment';

import * as actionTypes from 'constants/actionTypes';
import cronExpressionRegex from 'constants/cronExp';
import JobActionPanel from 'components/JobActionPanel';
import JobParameters from 'components/JobParameters';
import { paramTypes } from 'constants/paramTypes';

const jobDetailsStyle = {
    padding: 24,
};

const validCronExpression = exp => {
    return exp.trim().match(cronExpressionRegex);
}

const styles = {
    mediumIcon: {
        width: 48,
        height: 48,
    },
}

class JobDetails extends Component {
    state = {
        cronExpressionErrorMessage: '',
    }

    onNameChange = (event, value) => {
        this.props.editJob("name", value);
    }

    onTypeChange = (event, index) => {
        const type = this.props.types[index];
        this.props.editJob("type", type);
    }

    onCronExpressionChange = (event, newValue) => {
        if (newValue === '') return;

        const validExp = validCronExpression(newValue);

        this.setState({
            cronExpressionErrorMessage: validExp
                ? '' : 'Invalid cron expression',
        });

        if (validExp) {
            this.props.editJob("cronExpression", newValue);
        }
    }
    
    renderLastExecutionText = () => {
        const lastExecution = moment(this.props.job.lastExecuted);
        return (
            <div>Last executed on <b>{}</b> at <b>{lastExecution.format('HH:ss')}</b>, status: {this.props.job.lastExecutedStatus}</div>
        );
    }

    render = () => (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Link to="/">
                    <IconButton
                        iconStyle={styles.mediumIcon}
                        style={styles.mediumIcon}
                    >
                        <FontIcon className="material-icons">arrow_back</FontIcon>
                    </IconButton>
                </Link>
                <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>
                    { this.props.title }
                </Heading>
            </div>
            { this.props.loaded && this.props.job ?
                <Paper style={jobDetailsStyle}>
                    <Heading>Attributes</Heading>
                    <TextField
                        fullWidth
                        defaultValue={this.props.job.name}
                        floatingLabelText="Name"
                        onChange={this.onNameChange}
                    />
                    <TextField
                        fullWidth
                        defaultValue={this.props.job.cronExpression}
                        floatingLabelText="Cron expression"
                        onChange={this.onCronExpressionChange}
                        errorText={this.state.cronExpressionErrorMessage}
                    />
                    <SelectField
                        fullWidth
                        value={this.props.job.type}
                        floatingLabelText="Job type"
                        onChange={this.onTypeChange}
                    >
                        { this.props.types && this.props.types.map(type => 
                            <MenuItem key={type} value={type} primaryText={type} />
                        )}
                    </SelectField>

                    { this.props.job.type && this.props.job.parameters &&
                        <div>
                            <Heading style={{ paddingTop: 24, paddingBottom: 16 }}>Parameters</Heading>
                            <JobParameters
                                parameters={this.props.job.parameters}
                            />
                        </div>
                    }
                    
                    { this.props.job.lastExecuted &&
                        <div>
                            <Heading style={{ paddingTop: 24, paddingBottom: 16 }}>Details</Heading>
                            <div>Job created on: {moment(this.props.job.created).format('DD.MM.YYYY')}</div>
                            <div>Last executed: {moment(this.props.job.lastExecuted).format('DD.MM.YYYY HH:ss')}</div>
                            <div>Last execution status: {this.props.job.lastExecutedStatus}</div>
                        </div>
                    }
                
                    <JobActionPanel
                        job={this.props.job}
                        save={() => this.props.save(this.props.job)}
                        delete={() => this.props.delete(this.props.job.id)}
                        saveLabel={this.props.saveLabel}
                        deleteLabel={this.props.deleteLabel}
                    />
                </Paper>
                : <div>Could not find job</div>
            }
        </div>
    );
}

export default JobDetails;