import {<%="\n  " + decorators.join(",\n  ") + ",\n" %>} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class Create<%= classify(name) %>Dto {
<%= attributesToDeclaration(attributes, dtoAttributeDecorator)%>
}

export class Update<%= classify(name) %>Dto {
<%= attributesToDeclaration(attributes, dtoAttributeDecorator)%>
}