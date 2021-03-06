import React from "react";
import { connect } from 'react-redux';
import { Icon, Header, List } from 'semantic-ui-react';
import { removeResource, updateSectionsLockState } from 'Actions/editor.js';
import './AllResourcesList.scss';

const AllResourcesList = ({ boughtResources, onRemoveResource, onUpdateSectionsLockState }) => {
    const removeResource = item => {
        onRemoveResource(item);
        onUpdateSectionsLockState();
    };

    const getResourceComponent = item => {
        switch (item.category) {
            case 'arm':
                return <ArmResource item={item} onRemove={removeResource} />
            case 'missile':
                return <MissileResource item={item} onRemove={removeResource} />
            case 'fullArmor':
                return <FullArmorResource item={item} onRemove={removeResource} />
            case 'partsArmor':
                return <PartsArmorResource item={item} onRemove={removeResource} />
            case 'relationship':
                return <RelationshipResource item={item} onRemove={removeResource} />
            case 'simple':
            case 'property':
            case 'reputation':
            case 'affiliation':
            default:
                return <SimpleResource item={item} onRemove={removeResource} />;
        }
    };

    return (
        <div className="AllResourcesList">
            {boughtResources.length > 0
                ? boughtResources.map(resource => (
                    getResourceComponent(resource)
                ))
                : <p>Nothing here yet...</p>
            }
        </div>
    );
};

const ResourceItem = ({ item, children, onRemove }) => {
    return (
        <div className="ResourceItem">
            <div className="children">
                {children}
            </div>
            <Icon
                name="delete"
                color="red"
                onClick={() => onRemove(item)}
            />
        </div>
    );
};

const SimpleResource = ({ item, onRemove }) => {
    return (
        <ResourceItem item={item} onRemove={onRemove}>
            <div className="header">
                <Header as="h3">{item.name}</Header>
                <Header as="h3">{item.price} rps</Header>
            </div>
            <p className="Note">{item.note}</p>
        </ResourceItem>
    );
};

const ArmResource = ({ item, onRemove }) => {
    return (
        <ResourceItem item={item} onRemove={onRemove}>
            <div className="header">
                <Header as="h3">{`${item.quality.name} Quality Arms`}</Header>
                <Header as="h3">{item.price} rps</Header>
            </div>
            <p className="Note">{item.note}</p>
            <List bulleted>
                {item.modifications.map(modif => (
                    <List.Item>
                        <List.Content>{modif}</List.Content>
                    </List.Item>
                ))}
            </List>
        </ResourceItem>
    );
};

const MissileResource = ({ item, onRemove }) => {
    return (
        <ResourceItem item={item} onRemove={onRemove}>
            <div className="header">
                <Header as="h3">{`${item.quality.name} Quality ${item.type.name}`}</Header>
                <Header as="h3">{item.price} rps</Header>
            </div>
            <p className="Note">{item.note}</p>
            <List bulleted>
                {item.addons.map(addon => (
                    <List.Item>
                        <List.Content>{addon}</List.Content>
                    </List.Item>
                ))}
            </List>
        </ResourceItem>
    );
};

const FullArmorResource = ({ item, onRemove }) => {
    return (
        <ResourceItem item={item} onRemove={onRemove}>
            <div className="header">
                <Header as="h3">{`${item.quality.name} Quality ${item.type.name}`}</Header>
                <Header as="h3">{item.price} rps</Header>
            </div>
            <p className="Note">{item.note}</p>
        </ResourceItem>
    );
};

const PartsArmorResource = ({ item, onRemove }) => {
    return (
        <ResourceItem item={item} onRemove={onRemove}>
            <div className="header">
                <Header as="h3">Parts Armor</Header>
                <Header as="h3">{item.price} rps</Header>
            </div>
            <p className="Note">{item.note}</p>
            <List bulleted>
                {Object.keys(item.selectedParts).map(part => (
                    <List.Item>
                        <List.Content>
                            {`${part[0].toUpperCase()}${part.slice(1)} - ${item.selectedParts[part].quality.name} Quality ${item.selectedParts[part].type.name}`}
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </ResourceItem>
    );
};

const RelationshipResource = ({ item, onRemove }) => {
    return (
        <ResourceItem item={item} onRemove={onRemove}>
            <div className="header">
                <Header as="h3">Relationship</Header>
                <Header as="h3">{item.price} rps</Header>
            </div>
            <p className="Note">{item.note}</p>
            <List bulleted>
                {item.modifiers.map(modifier => (
                    <List.Item>
                        <List.Content>{modifier.name}</List.Content>
                    </List.Item>
                ))}
            </List>
        </ResourceItem>
    );
};

const mapStateToProps = state => ({
    boughtResources: state.editor.resources.boughtResources
});


const mapDispatchToProps = dispatch => ({
    onRemoveResource: item => dispatch(removeResource(item)),
    onUpdateSectionsLockState: () => dispatch(updateSectionsLockState())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllResourcesList);