import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/modules/Auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.cookies.jwt;
      console.log(token);
      this.authService.verifyToken(token);
      return true;
    } catch (error) {
      console.log('Não pode acessar!');
      return false;
    }
  }
}
