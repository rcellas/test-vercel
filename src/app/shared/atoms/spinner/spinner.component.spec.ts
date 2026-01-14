import { describe, it, expect } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default medium size', () => {
    expect(component.size()).toBe('md');
  });

  it('should apply correct classes for small size', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('[role="status"]');
    expect(spinner.classList.contains('h-8')).toBe(true);
    expect(spinner.classList.contains('w-8')).toBe(true);
  });

  it('should apply correct classes for large size', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('[role="status"]');
    expect(spinner.classList.contains('h-16')).toBe(true);
    expect(spinner.classList.contains('w-16')).toBe(true);
  });

  it('should have accessibility attributes', () => {
    const container = fixture.nativeElement.querySelector('[aria-label]');
    expect(container).toBeTruthy();
    expect(container.getAttribute('aria-label')).toBe('Cargando');
  });
});
