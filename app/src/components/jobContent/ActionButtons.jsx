import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';

const styles = {
    buttonPanel: {
        marginTop: 24,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    noWrap: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    buttons: {
        marginRight: 8,
        marginLeft: 8,
    }
}

class ActionButtons extends Component {
    state = { deleteDialogOpen: false }
    toggleDeleteDialog = open  => {
        this.setState({
            deleteDialogOpen: open,
        });
    }

    closeDeleteDialog = () => { this.toggleDeleteDialog(false); }
    openDeleteDialog = () => { this.toggleDeleteDialog(true); }

    confirmDelete = () => {
        this.closeDeleteDialog();
        this.props.delete();
    }

    render = () => {
        const deleteDialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeDeleteDialog}
            />,
            <RaisedButton
                secondary
                label="Submit"
                style={{ marginLeft: 16 }}
                onClick={this.confirmDelete}
            />
        ];

        return (
            <div style={styles.buttonPanel}>
                <Dialog
                    title={`Are you sure you want to delete "${this.props.job.name}"?`}
                    actions={deleteDialogActions}
                    open={this.state.deleteDialogOpen}
                    onRequestClose={this.closeDeleteDialog}
                />
                <RaisedButton
                    primary
                    style={{ ...styles.buttons, ...styles.noWrap }}
                    disabled={!this.props.saveEnabled}
                    label={this.props.saveLabel}
                    onClick={this.props.save}
                    icon={<FontIcon className="material-icons">cloud_upload</FontIcon>}
                />
                { this.props.deleteLabel &&
                    <RaisedButton
                        secondary
                        style={{ ...styles.buttons, ...styles.noWrap }}
                        disabled={this.props.disabled}
                        label={this.props.deleteLabel}
                        icon={<FontIcon className="material-icons">delete_forever</FontIcon>}
                        onClick={this.openDeleteDialog}
                    />
                }
            </div>
        );
    }
}

export default ActionButtons;