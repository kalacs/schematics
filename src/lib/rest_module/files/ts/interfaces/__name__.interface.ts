import { Document } from 'mongoose';

export interface <%= classify(name) %> extends Document {
<%= attributesToDeclaration(attributes)%>
}
