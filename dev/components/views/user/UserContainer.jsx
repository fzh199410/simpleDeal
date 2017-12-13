import React from 'react';

class UserContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            {this.props.children}
        </div>;
    }

}

export default UserContainer;
