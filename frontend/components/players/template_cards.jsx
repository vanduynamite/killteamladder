import React from 'react';
import Statistic from '../general/statistic';
import TemplateListItem from './template_list_item';

export default function({ templates, templateIds }) {
  if (!templates || !templateIds) return;

  const templateList = Object.values(templateIds).map(record => {
    if (record.allowed === 0) return;
    const template = templates[record.id];
    return <TemplateListItem template={ template } key={ record.id }
      addable={ true }/>;
  });

  return (
    <div>
      { templateList }
    </div>
  );
}
