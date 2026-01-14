import { describe, it, expect } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.componentRef.setInput('text', 'Test');
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
  });

  it('should display the provided text', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.componentRef.setInput('text', 'Vivo');
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.textContent?.trim()).toBe('Vivo');
  });

  it('should apply success variant classes', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.componentRef.setInput('text', 'Vivo');
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.classList.contains('bg-green-100')).toBe(true);
    expect(badge.classList.contains('text-green-800')).toBe(true);
  });

  it('should apply danger variant classes', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.componentRef.setInput('text', 'Muerto');
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.classList.contains('bg-red-100')).toBe(true);
    expect(badge.classList.contains('text-red-800')).toBe(true);
  });

  it('should apply warning variant classes', () => {
    fixture.componentRef.setInput('variant', 'warning');
    fixture.componentRef.setInput('text', 'Desconocido');
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.classList.contains('bg-gray-100')).toBe(true);
    expect(badge.classList.contains('text-gray-800')).toBe(true);
  });
});
