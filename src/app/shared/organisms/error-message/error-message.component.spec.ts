import { describe, it, expect, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('message', 'Test error');
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
  });

  it('should display the error message', () => {
    const errorMsg = 'No se pudieron cargar los personajes';
    fixture.componentRef.setInput('message', errorMsg);
    fixture.detectChanges();
    
    const messageElement = fixture.nativeElement.querySelector('p');
    expect(messageElement.textContent?.trim()).toBe(errorMsg);
  });

  it('should have retry button', () => {
    fixture.componentRef.setInput('message', 'Error');
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent?.trim()).toBe('Reintentar');
  });

  it('should emit retry event when button is clicked', () => {
    fixture.componentRef.setInput('message', 'Error');
    fixture.detectChanges();
    
    const retrySpy = vi.fn();
    component.retry.subscribe(retrySpy);
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    
    expect(retrySpy).toHaveBeenCalled();
  });

  it('should have accessibility role', () => {
    fixture.componentRef.setInput('message', 'Error');
    fixture.detectChanges();
    
    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert).toBeTruthy();
  });
});
