import { describe, it, expect } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusIndicatorComponent } from './status-indicator.component';

describe('StatusIndicatorComponent', () => {
  let component: StatusIndicatorComponent;
  let fixture: ComponentFixture<StatusIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusIndicatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('status', 'Alive');
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
  });

  it('should map Alive status to success variant', () => {
    fixture.componentRef.setInput('status', 'Alive');
    fixture.detectChanges();
    
    expect(component.variant()).toBe('success');
    expect(component.statusText()).toBe('Vivo');
  });

  it('should map Dead status to danger variant', () => {
    fixture.componentRef.setInput('status', 'Dead');
    fixture.detectChanges();
    
    expect(component.variant()).toBe('danger');
    expect(component.statusText()).toBe('Muerto');
  });

  it('should map unknown status to warning variant', () => {
    fixture.componentRef.setInput('status', 'unknown');
    fixture.detectChanges();
    
    expect(component.variant()).toBe('warning');
    expect(component.statusText()).toBe('Desconocido');
  });

  it('should render badge component with correct props', () => {
    fixture.componentRef.setInput('status', 'Alive');
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('app-badge');
    expect(badge).toBeTruthy();
  });
});
