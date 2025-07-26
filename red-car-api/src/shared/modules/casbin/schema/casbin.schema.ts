/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { newModel } from 'casbin';

export const CasbinModel = newModel(
  `
[request_definition]
r = sub, obj, act  # sub: sujeto (usuario), obj: objeto (recurso), act: acción (permiso)

[policy_definition]
p = sub, obj, act  # Definición de políticas: quién puede hacer qué sobre qué

[role_definition]
g = _, _  # Relación de roles: quién hereda qué rol

[policy_effect]
e = some(where (p.eft == allow))  # Cuando alguna política permita la acción, se permite

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act || r.sub == p.sub && r.obj == p.obj && r.act == p.act
# El matcher comprueba si el rol del sujeto y la política coinciden con la acción
`,
);
