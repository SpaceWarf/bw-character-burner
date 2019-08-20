import React from "react";
import { Card, Icon } from 'semantic-ui-react';
import './Skill.scss';
import { Menu } from "semantic-ui-react";

const Skill = ({ skill }) => {
    return (
        <Menu.Item className="Skill" id={skill.name.replace(/\s/g, '')}>
            <Card>
                <Card.Content>
                    <Card.Header>
                        <Icon
                            name='linkify'
                            onClick={() => window.location.href = `#${skill.name.replace(/\s/g, '')}`}
                            link
                        />
                        <p>{skill.name}</p>
                        {skill.skillType && <p>{skill.skillType}</p>}
                        {skill.roots && <p>{skill.roots.join(', ')}</p>}
                    </Card.Header>
                    {!skill.isWiseSkill && <Card.Description>
                        {skill.description &&
                            <p>{skill.description}</p>
                        }
                        {skill.FoRKs &&
                            <p><b>FoRKs</b>: {skill.FoRKs.join(', ')}</p>
                        }
                        {skill.tools &&
                            <p><b>Tools</b>: Yes.
                            {skill.tools.expendable &&
                                    ' Expendable.'
                                }
                                {skill.tools.type &&
                                    ` ${skill.tools.type}.`
                                }</p>
                        }
                    </Card.Description>}
                </Card.Content>
            </Card>
        </Menu.Item>
    );
};

export default Skill;