import {<%="\n  " + decorators.join(",\n  ") + ",\n" %>} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class Update<%= classify(name) %>Dto {
<%= attributesToDeclaration(attributes, dtoAttributeDecorator)%>
}
