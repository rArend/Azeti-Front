import { PureComponent, ChangeEvent } from "react";
import { Button, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { FormLayout } from "./form-layout";
import { MyDialog } from "./dialog";

interface Props {
}

interface IState {
    pageAddress: string,
    returnedTitle: string,
    dialogOpen: boolean,
    invalidUrl: boolean,
}

export default class Body extends PureComponent<Props, IState> {
    state: IState;

    constructor(props: Props){
        super(props);

        this.state = {
            pageAddress: '',
            returnedTitle: '',
            dialogOpen: false,
            invalidUrl: false,
        };
    }

    handleCloseDialog = () => {
        this.setState({dialogOpen: false});
    }

    handleInputChage = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            pageAddress: event.target?.value || '',
            invalidUrl: false,
        });
    }

    handleOnSubmit = (event: KeyboardEvent) => {
        event.preventDefault();
        this.handleClick();
    }
    
    handleClick = () => {
        const encodedURI = encodeURIComponent(this.state.pageAddress);
        const myHeaders = new Headers({
            'Content-Type': 'text/plain'
          });

          const myRequest = new Request(`http://localhost:8080/title/?page_address=${encodedURI}`, {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
          });
        fetch(myRequest)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
                return "";
            })
            .then(title => {
                const validUrl = title.length > 0;
                this.setState({
                    returnedTitle: title,
                    dialogOpen: validUrl,
                    invalidUrl: !validUrl,
                });
            });
    }

    render() {
        const {
            returnedTitle,
            dialogOpen,
            invalidUrl,
        } = this.state;

        return (
           <FormLayout onSubmit={this.handleOnSubmit}>
               <TextField name="pageAddress" label="Insert page address" onChange={this.handleInputChage} error={invalidUrl} />
                <Typography variant="caption" color="error">{invalidUrl ? "The Url inserted is invalid": ""}</Typography>
                <Button variant="contained" color="primary" onClick={this.handleClick}>Get Page Title</Button>
                <MyDialog 
                    open={dialogOpen} 
                    onClose={this.handleCloseDialog}>
                    <DialogTitle>
                        <Typography color="secondary">
                            Page's title is
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="h4">
                            {returnedTitle}
                        </Typography>
                    </DialogContent>
                </MyDialog>
           </FormLayout>
        );
    }
}